# type: ignore
from models.feature_flag import get_all_feature_flags, get_feature_flag_by_name
from tests.factories import FeatureFlagFactory


class TestFeatureFlags:
    def test_get_all_feature_flags(self) -> None:
        feature_flag1 = FeatureFlagFactory.create()
        feature_flag2 = FeatureFlagFactory.create()
        res = get_all_feature_flags()
        assert set(res) == set([feature_flag1, feature_flag2])

    def test_get_feature_flag_by_name(self) -> None:
        feature_flag = FeatureFlagFactory.create()
        res = get_feature_flag_by_name(name=feature_flag.name)
        assert res == feature_flag.value

    def test_get_feature_flag_by_name_with_deafult(self) -> None:
        feature_flag = FeatureFlagFactory.create(value=True)
        res = get_feature_flag_by_name(name=feature_flag.name, default=False)
        assert feature_flag.value == res

    def test_get_null_feature_flag_by_name_with_deafult(self) -> None:
        default = True
        res = get_feature_flag_by_name(
            name="non_existing_feature_flag", default=default
        )
        assert res == default

    def test_get_null_feature_return_none(self) -> None:
        res = get_feature_flag_by_name(name="non_existing_feature_flag")
        assert res == None
